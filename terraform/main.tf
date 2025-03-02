terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

# Run an Nginx container attached to the network
resource "docker_container" "nginx_container" {
  name  = "nginx_server"
  image = docker_image.nginx_image.name

  # Attach to the network so that it can reach the sample-app container
  networks_advanced {
    name = docker_network.my_network.name
  }

  # Map container port 80 to host port 80
  ports {
    internal = 80
    external = 80
  }

  # Mount our custom Nginx configuration
  volumes {
    host_path      = "${path.module}/nginx.conf"
    container_path = "/etc/nginx/nginx.conf"
  }
}