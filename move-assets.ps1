# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "public\assets\images\admin"
New-Item -ItemType Directory -Force -Path "public\assets\images\user"
New-Item -ItemType Directory -Force -Path "public\assets\images\common"
New-Item -ItemType Directory -Force -Path "public\assets\videos"

# Move admin images
Move-Item -Force "src\ADMIN1\Admin_home\namma_spot_logo*.jpg" "public\assets\images\admin\"
Move-Item -Force "src\ADMIN1\Admin_home\Team.jpg" "public\assets\images\admin\"
Move-Item -Force "src\ADMIN1\Admin_home\car.jpg" "public\assets\images\admin\"
Move-Item -Force "src\ADMIN1\Admin_home\homeimg1.jpg" "public\assets\images\admin\"
Move-Item -Force "src\ADMIN1\Admin_home\semester_Mark.jpg" "public\assets\images\admin\"

# Move user images
Move-Item -Force "src\USER1\Homepage\car_img.jpg" "public\assets\images\user\"
Move-Item -Force "src\USER1\Homepage\man.jpg" "public\assets\images\user\"
Move-Item -Force "src\USER1\Homepage\WhatsApp Image*.jpg" "public\assets\images\user\"
Move-Item -Force "src\USER1\Home\*.jpg" "public\assets\images\user\"


# Move common images
Move-Item -Force "google-maps.png" "public\assets\images\common\"
Move-Item -Force "src\Fpage\bglogo.jpg" "public\assets\images\common\"

# Move videos
Move-Item -Force "src\ADMIN1\Admin_home\homevideo.mp4" "public\assets\videos\"
Move-Item -Force "src\USER1\Homepage\WhatsApp Video*.mp4" "public\assets\videos\"
Move-Item -Force "src\USER1\Home\homevideo.mp4" "public\assets\videos\"
