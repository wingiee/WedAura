
import {
  Calendar,
  CalendarIcon,
  Check,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RegionFilter, RegionBadges } from "./RegionFilter";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface WeddingFilterProps {
  onChange: (filters: WeddingFilters) => void;
  className?: string;
}

export interface WeddingFilters {
  regions: string[];
  weddingTypes: string[];
  priceRange: [number, number];
  dateRange: { from: Date | undefined; to: Date | undefined } | undefined;
  experiences: string[];
  guestCount: number;
}

const defaultFilters: WeddingFilters = {
  regions: [],
  weddingTypes: [],
  priceRange: [0, 5000],
  dateRange: undefined,
  experiences: [],
  guestCount: 1,
};

const weddingTypes = [
  { id: "hindu", label: "Hindu Wedding" },
  { id: "muslim", label: "Muslim Wedding" },
  { id: "sikh", label: "Sikh Wedding" },
  { id: "christian", label: "Christian Wedding" },
  { id: "jain", label: "Jain Wedding" },
  { id: "buddhist", label: "Buddhist Wedding" },
  { id: "parsi", label: "Parsi Wedding" },
  { id: "inter-faith", label: "Inter-Faith Wedding" },
];

const experienceOptions = [
  { id: "mehendi", label: "Mehendi Ceremony" },
  { id: "sangeet", label: "Sangeet Night" },
  { id: "haldi", label: "Haldi Ceremony" },
  { id: "baraat", label: "Baraat Procession" },
  { id: "reception", label: "Reception Party" },
  { id: "traditional-food", label: "Traditional Food" },
  { id: "local-tours", label: "Local Tours" },
  { id: "cultural-performances", label: "Cultural Performances" },
];

export function WeddingFilter({ onChange, className }: WeddingFilterProps) {
  const [filters, setFilters] = useState<WeddingFilters>(defaultFilters);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });

  const updateFilters = (partialFilters: Partial<WeddingFilters>) => {
    const newFilters = { ...filters, ...partialFilters };
    setFilters(newFilters);
    onChange(newFilters);
  };

  const handleRegionChange = (regions: string[]) => {
    updateFilters({ regions });
  };

  const removeRegion = (region: string) => {
    updateFilters({
      regions: filters.regions.filter((r) => r !== region)
    });
  };

  const toggleWeddingType = (typeId: string) => {
    const newTypes = filters.weddingTypes.includes(typeId)
      ? filters.weddingTypes.filter((t) => t !== typeId)
      : [...filters.weddingTypes, typeId];
    updateFilters({ weddingTypes: newTypes });
  };

  const toggleExperience = (experienceId: string) => {
    const newExperiences = filters.experiences.includes(experienceId)
      ? filters.experiences.filter((e) => e !== experienceId)
      : [...filters.experiences, experienceId];
    updateFilters({ experiences: newExperiences });
  };

  const handleDateChange = (value: { from: Date | undefined; to: Date | undefined }) => {
    setDate(value);
    updateFilters({ dateRange: value });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setDate({ from: undefined, to: undefined }); // Fixed: Initialize with undefined values
    onChange(defaultFilters);
    setOpen(false);
  };

  const applyFilters = () => {
    onChange(filters);
    setOpen(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.regions.length > 0) count++;
    if (filters.weddingTypes.length > 0) count++;
    if (filters.priceRange[0] > defaultFilters.priceRange[0] || 
        filters.priceRange[1] < defaultFilters.priceRange[1]) count++;
    if (filters.dateRange?.from || filters.dateRange?.to) count++;
    if (filters.experiences.length > 0) count++;
    if (filters.guestCount > 1) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={className}>
      <div className="flex items-center gap-4 flex-wrap">
        <RegionFilter
          selectedRegions={filters.regions}
          onChange={handleRegionChange}
        />

        <DateRangePicker
          date={date}
          onChange={handleDateChange}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Filter Weddings</DialogTitle>
              <DialogDescription>
                Customize your search to find the perfect wedding experience.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-4">
                <h3 className="font-medium">Wedding Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {weddingTypes.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`type-${type.id}`}
                        checked={filters.weddingTypes.includes(type.id)}
                        onCheckedChange={() => toggleWeddingType(type.id)}
                      />
                      <label
                        htmlFor={`type-${type.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Price Range (USD)</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={filters.priceRange}
                    max={5000}
                    step={100}
                    onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Guest Count</h3>
                <Select
                  value={filters.guestCount.toString()}
                  onValueChange={(value) => updateFilters({ guestCount: parseInt(value) })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "guest" : "guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Experiences</h3>
                <div className="grid grid-cols-2 gap-2">
                  {experienceOptions.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`exp-${exp.id}`}
                        checked={filters.experiences.includes(exp.id)}
                        onCheckedChange={() => toggleExperience(exp.id)}
                      />
                      <label
                        htmlFor={`exp-${exp.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {exp.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={resetFilters}>
                Reset All
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <RegionBadges 
        selectedRegions={filters.regions} 
        onRemove={removeRegion} 
      />
      
      {(date.from || date.to) && (
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full font-normal h-7 px-3 cursor-pointer"
            onClick={() => handleDateChange({ from: undefined, to: undefined })} // Fixed: Initialize with undefined values
          >
            <Calendar className="mr-2 h-3 w-3" />
            {date.from && date.to
              ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
              : date.from
              ? `From ${format(date.from, "LLL dd, y")}`
              : date.to
              ? `Until ${format(date.to, "LLL dd, y")}`
              : "Select dates"}
            <X className="ml-2 h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

function DateRangePicker({
  date,
  onChange,
}: {
  date: { from: Date | undefined; to: Date | undefined };
  onChange: (date: { from: Date | undefined; to: Date | undefined }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date.from || date.to ? (
            date.from && date.to ? (
              <span>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </span>
            ) : (
              <span>
                {date.from
                  ? `From ${format(date.from, "LLL dd, y")}`
                  : date.to ? `Until ${format(date.to, "LLL dd, y")}` : ""}
              </span>
            )
          ) : (
            <span>Select dates</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="range"
          defaultMonth={date.from}
          selected={{ from: date.from, to: date.to }}
          onSelect={onChange}
          initialFocus
          numberOfMonths={2}
          disabled={(date) => date < new Date()}
          className="pointer-events-auto"
        />
        <div className="border-t p-2 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onChange({ from: undefined, to: undefined }); // Fixed: Initialize with undefined values
              setIsOpen(false);
            }}
            className="text-xs"
          >
            Clear
          </Button>
          <Button
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-xs"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
