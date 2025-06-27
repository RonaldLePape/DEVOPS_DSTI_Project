provider "aws" {
  region = "eu-west-3"
}


resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  instance_tenancy     = "default"

  tags = {
    Name = "project-vpc"
  }
}

resource "aws_subnet" "my_subnet" {
  vpc_id            = "vpc-0dc8661045db6668d"
  cidr_block        = "10.0.0.0/20"
  availability_zone = "eu-west-3a"

  map_public_ip_on_launch = false

  tags = {
    Name = "project-subnet-public1-eu-west-3a"
  }
}

resource "aws_security_group" "my_security_group" {
  name        = "launch-wizard-1"
  description = "launch-wizard-1 created 2025-06-01T13:48:25.698Z"
  vpc_id      = "vpc-0dc8661045db6668d"
  revoke_rules_on_delete = false

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


resource "aws_instance" "my_instance" {
  ami                         = "ami-0160e8d70ebc43ee1"
  instance_type               = "t3.medium"
  subnet_id                   = "subnet-0c652fe9a6a73f860"
  key_name                    = "kp-dsti-project"
  associate_public_ip_address = true
  monitoring                  = false
  ebs_optimized               = true
  source_dest_check           = true
  private_ip                  = "10.0.8.58"

  root_block_device {
    volume_size           = 16
    volume_type           = "gp3"
    delete_on_termination = true
    iops                  = 3000
    throughput            = 125
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_protocol_ipv6          = "disabled"
    http_put_response_hop_limit = 2
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  maintenance_options {
    auto_recovery = "default"
  }

  private_dns_name_options {
    enable_resource_name_dns_a_record    = false
    enable_resource_name_dns_aaaa_record = false
    hostname_type                        = "ip-name"
  }

  vpc_security_group_ids = [
    "sg-00ef1ca432f514dcb"
  ]

  tags = {
    Name = "My app server 2"
  }
}
