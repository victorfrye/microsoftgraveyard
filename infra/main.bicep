param projectName string
param appName string
param domainName string
param appRepo string

param googleVerificationCode string
param bingVerificationCode string

param location string = resourceGroup().location

// MARK: Static Web App

resource swaApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: 'stapp-${appName}'
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  tags: {
    Project: projectName
  }
  properties: {
    repositoryUrl: 'https://github.com/${appRepo}'
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'GitHub'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource swaBasicAuth 'Microsoft.Web/staticSites/basicAuth@2024-04-01' = {
  parent: swaApp
  name: 'default'
  properties: {
    applicableEnvironmentsMode: 'SpecifiedEnvironments'
  }
}

resource swaApexDomain 'Microsoft.Web/staticSites/customDomains@2024-04-01' = {
  parent: swaApp
  name: domainName
  properties: {
    expiresOn: true
  }
}

resource swaWwwDomain 'Microsoft.Web/staticSites/customDomains@2024-04-01' = {
  parent: swaApp
  name: 'www.${domainName}'
}

// MARK: Domain Name System

resource dnsZone 'Microsoft.Network/dnszones@2023-07-01-preview' = {
  name: domainName
  location: 'global'
  tags: {
    Project: projectName
  }
  properties: {
    zoneType: 'Public'
  }
}

resource dnsNameServers 'Microsoft.Network/dnszones/NS@2023-07-01-preview' = {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 172800
    NSRecords: [
      {
        nsdname: 'ns1-33.azure-dns.com.'
      }
      {
        nsdname: 'ns2-33.azure-dns.net.'
      }
      {
        nsdname: 'ns3-33.azure-dns.org.'
      }
      {
        nsdname: 'ns4-33.azure-dns.info.'
      }
    ]
  }
}

resource dnsStartOfAuthority 'Microsoft.Network/dnszones/SOA@2023-07-01-preview' = {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 3600
    SOARecord: {
      email: 'azuredns-hostmaster.microsoft.com'
      expireTime: 2419200
      host: 'ns1-33.azure-dns.com.'
      minimumTTL: 300
      refreshTime: 3600
      retryTime: 300
      serialNumber: 1
    }
  }
}

resource dnsAddress 'Microsoft.Network/dnszones/A@2023-07-01-preview' = {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 3600
    targetResource: {
      id: swaApp.id
    }
  }
}

resource dnsText 'Microsoft.Network/dnszones/TXT@2023-07-01-preview' = {
  parent: dnsZone
  name: '@'
  properties: {
    TTL: 3600
    TXTRecords: [
      {
        value: [
          'google-site-verification=${googleVerificationCode}'
        ]
      }
    ]
  }
}

resource dnsWwwCname 'Microsoft.Network/dnszones/CNAME@2023-07-01-preview' = {
  parent: dnsZone
  name: 'www'
  properties: {
    TTL: 3600
    CNAMERecord: {
      cname: swaApp.properties.defaultHostname
    }
  }
}

resource dnsBingVerification 'Microsoft.Network/dnszones/CNAME@2023-07-01-preview' = {
  parent: dnsZone
  name: bingVerificationCode
  properties: {
    TTL: 3600
    CNAMERecord: {
      cname: 'verify.bing.com'
    }
  }
}
