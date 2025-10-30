resource "azurerm_static_web_app" "stapp" {
  name                = "stapp-${var.application_name}"
  resource_group_name = data.azurerm_resource_group.graveyard.name
  location            = data.azurerm_resource_group.graveyard.location
  tags                = data.azurerm_resource_group.graveyard.tags

  sku_size = var.swa_sku
  sku_tier = var.swa_sku

  lifecycle {
    ignore_changes = [
      repository_branch,
      repository_token,
      repository_url
    ]
  }
}

resource "azurerm_static_web_app_custom_domain" "apex" {
  static_web_app_id = azurerm_static_web_app.stapp.id

  domain_name     = var.domain_name
  validation_type = "dns-txt-token"
}

resource "azurerm_static_web_app_custom_domain" "www" {
  static_web_app_id = azurerm_static_web_app.stapp.id

  domain_name     = "${azurerm_dns_cname_record.www.name}.${var.domain_name}"
  validation_type = "cname-delegation"
}
