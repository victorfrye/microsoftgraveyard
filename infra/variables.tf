# MARK: Solution

variable "project_name" {
  description = "The name of the project."
  type        = string
  default     = "Microsoft Graveyard"
}

variable "application_name" {
  description = "The name of the application."
  type        = string
  default     = "graveyard"
}

variable "rg_name" {
  description = "The name of the resource group."
  type        = string
  default     = "rg-graveyard"
}

variable "owner_name" {
  description = "The name of the owner."
  type        = string
  default     = "victorfrye"
}

# MARK: Azure Static Web App

variable "swa_sku" {
  description = "The SKU for the Static Web App."
  type        = string
  default     = "Free"
}

# MARK: Azure DNS

variable "domain_name" {
  description = "The domain name for the DNS zone."
  type        = string
  default     = "microsoftgraveyard.com"
}

variable "bing_validation_token" {
  description = "The Bing validation token."
  type        = string
  default     = "d84e48dba14561f02127fe2a992c4268"
}

variable "google_validation_token" {
  description = "The Google validation token."
  type        = string
  default     = "google-site-verification=ECVTPtgPN_gypG-dufpg8O0wFn7J_meWFqwqu99Oxno"
}

variable "bluesky_validation_token" {
  description = "The Bluesky validation token."
  type        = string
  default     = "did=did:plc:c7hjtvlleoqpqxdhs2vdilo3"
}
