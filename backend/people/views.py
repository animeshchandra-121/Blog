from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostUsersSerializer, UserSerializer
from .models import PostUsers
from django.contrib.auth.models import User
from datetime import datetime
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username = serializer.data['username'])
            refresh = RefreshToken.for_user(user)
            return Response({'status':200,
                             'payload':serializer.data,
                             'refresh': str(refresh),
                             'access': str(refresh.access_token),})
        print(serializer.errors)  # ADD THIS

        return Response({'status': 403, 'error': serializer.errors, 'message': 'Something went wrong'})

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username') 
        password = request.data.get('password')
        
        user = authenticate(username = username, password = password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            serializer = UserSerializer(user)

            return Response({
                'status': 200,
                'message': 'Login successful',
                'payload': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({
                'status': 401,
                'message': 'Invalid username or password'
            })


class PostUserAPI(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = PostUsersSerializer(data=request.data)

        if not serializer.is_valid():
            return Response({'status': 403, 'message': serializer.errors})

        post = serializer.save()
        formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M")
        post.created_on = formatted_date
        post.save()
        return Response({'status': 200, 'message': 'Post user created', 'data': serializer.data})

class PostDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        post = get_object_or_404(PostUsers, id=id)

        # Exclude self-views
        if request.user != post.user and request.user.is_authenticated:
            if not post.views.filter(id=request.user.id).exists():
                post.views.add(request.user)

        serializer = PostUsersSerializer(post)
        return Response(serializer.data)