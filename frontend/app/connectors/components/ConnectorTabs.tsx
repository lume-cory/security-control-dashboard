import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ConnectorTabsProps {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function ConnectorTabs({ categories, activeTab, setActiveTab }: ConnectorTabsProps) {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="all">All</TabsTrigger>
        {categories.map(category => (
          <TabsTrigger key={category} value={category}>
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
} 