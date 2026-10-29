terraform {
  required_version = "~> 1.17.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 5.11"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-tfstate"
    storage_account_name = "stvftfscus"
    container_name       = "graveyard"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  resource_providers_to_register = [
    "Microsoft.Network",
    "Microsoft.Web",
  ]

  features {}
}

data "azurerm_resource_group" "graveyard" {
  name = var.rg_name
}

data "azurerm_client_config" "current" {}

locals {}
