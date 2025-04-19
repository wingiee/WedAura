
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Region {
  value: string;
  label: string;
  color: string;
}

const regions: Region[] = [
  { value: "north-indian", label: "North Indian", color: "bg-wedding-red" },
  { value: "south-indian", label: "South Indian", color: "bg-wedding-green" },
  { value: "east-indian", label: "East Indian", color: "bg-wedding-blue" },
  { value: "west-indian", label: "West Indian", color: "bg-wedding-orange" },
  { value: "central-indian", label: "Central Indian", color: "bg-wedding-purple" },
  { value: "north-east-indian", label: "North East Indian", color: "bg-wedding-pink" },
];

interface RegionFilterProps {
  selectedRegions: string[];
  onChange: (regions: string[]) => void;
}

export function RegionFilter({ selectedRegions, onChange }: RegionFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleRegion = (value: string) => {
    if (selectedRegions.includes(value)) {
      onChange(selectedRegions.filter((r) => r !== value));
    } else {
      onChange([...selectedRegions, value]);
    }
  };

  const clearAll = () => {
    onChange([]);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed justify-between">
          <span>{selectedRegions.length > 0 ? `${selectedRegions.length} region(s)` : "Select regions"}</span>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search regions..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {regions.map((region) => {
                const isSelected = selectedRegions.includes(region.value);
                return (
                  <CommandItem
                    key={region.value}
                    onSelect={() => toggleRegion(region.value)}
                    className="flex items-center gap-2"
                  >
                    <div className={`rounded-full w-3 h-3 ${region.color}`} />
                    <span>{region.label}</span>
                    <Check
                      className={`ml-auto h-4 w-4 ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          <div className="border-t p-2 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs"
            >
              Clear all
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
              className="text-xs"
            >
              Apply
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function RegionBadges({ 
  selectedRegions, 
  onRemove 
}: { 
  selectedRegions: string[];
  onRemove: (region: string) => void;
}) {
  if (selectedRegions.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedRegions.map((value) => {
        const region = regions.find((r) => r.value === value);
        if (!region) return null;
        
        return (
          <Badge 
            key={value} 
            variant="secondary"
            className="rounded-full font-normal py-1 px-3 cursor-pointer"
            onClick={() => onRemove(value)}
          >
            <div className={`rounded-full w-2 h-2 ${region.color} mr-2`} />
            {region.label}
            <span className="ml-1">×</span>
          </Badge>
        );
      })}
    </div>
  );
}
