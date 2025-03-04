'use client'

import { DefaultPageLayout } from "@/components/ui/subframe/layouts/DefaultPageLayout"
import { Button } from "@/subframe/components/Button"
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { useState } from "react"
import { connectors, categories } from "./data/connectors-data"
import { ConnectorSearch } from "./components/ConnectorSearch"
import { ConnectorGrid } from "./components/ConnectorGrid"
import { ConnectorFilter } from "./components/ConnectorFilter"

export default function ConnectorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [selectedStatuses, setSelectedStatuses] = useState<('connected' | 'available' | 'coming-soon')[]>(
    ['connected', 'available', 'coming-soon']
  );
  
  const filteredConnectors = connectors.filter(connector => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          connector.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(connector.category);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(connector.status);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
          <IconWithBackground size="medium" icon="FeatherShapes" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
            Connectors & Data Sources
          </span>
        </div>
        {/* <div className="flex w-full items-center justify-between">
          <Breadcrumbs>
            <Breadcrumbs.Item>Agents</Breadcrumbs.Item>
          </Breadcrumbs>
        </div> */}
        <div className="w-full">
          <p className="text-muted-foreground mb-4">Add your data sources and applications to the Lume security knowledge fabric</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-grow">
              <ConnectorSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
            <ConnectorFilter
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
            />
            <Button variant="brand-primary" icon="FeatherPlus" className="flex-shrink-0">
              Add Connector
            </Button>
          </div>
        </div>

        <div className="w-full">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredConnectors.length} {filteredConnectors.length === 1 ? 'connector' : 'connectors'} found
            </p>
          </div>
          <ConnectorGrid connectors={filteredConnectors} />
        </div>
      </div>
    </DefaultPageLayout>
  )
} 