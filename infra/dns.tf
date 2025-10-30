resource "azurerm_dns_zone" "domain" {
  name                = var.domain_name
  resource_group_name = data.azurerm_resource_group.graveyard.name
  tags                = data.azurerm_resource_group.graveyard.tags

  soa_record {
    email = "azuredns-hostmaster.microsoft.com"
    ttl   = 3600
  }
}

resource "azurerm_dns_ns_record" "name_servers" {
  name                = "@"
  resource_group_name = data.azurerm_resource_group.graveyard.name

  zone_name = azurerm_dns_zone.domain.name
  records   = azurerm_dns_zone.domain.name_servers
  ttl       = 172800
}

resource "azurerm_dns_a_record" "swa_alias" {
  name                = "@"
  resource_group_name = data.azurerm_resource_group.graveyard.name

  zone_name          = azurerm_dns_zone.domain.name
  target_resource_id = azurerm_static_web_app.stapp.id
  ttl                = 3600
}

resource "azurerm_dns_cname_record" "www" {
  name                = "www"
  resource_group_name = data.azurerm_resource_group.graveyard.name

  zone_name = azurerm_dns_zone.domain.name
  record    = azurerm_static_web_app.stapp.default_host_name
  ttl       = 3600
}

resource "azurerm_dns_cname_record" "bing" {
  name                = var.bing_validation_token
  resource_group_name = data.azurerm_resource_group.graveyard.name

  zone_name = azurerm_dns_zone.domain.name
  record    = "verify.bing.com"
  ttl       = 3600
}

resource "azurerm_dns_txt_record" "apex" {
  name                = "@"
  resource_group_name = data.azurerm_resource_group.graveyard.name

  zone_name = azurerm_dns_zone.domain.name
  ttl       = 3600

  dynamic "record" {
    for_each = compact([
      var.google_validation_token,
      azurerm_static_web_app_custom_domain.apex.validation_token
    ])

    content {
      value = record.value
    }
  }
}

resource "azurerm_dns_txt_record" "bluesky" {
  name                = "_atproto"
  resource_group_name = data.azurerm_resource_group.graveyard.name

  zone_name = azurerm_dns_zone.domain.name
  ttl       = 3600

  record {
    value = var.bluesky_validation_token
  }
}
