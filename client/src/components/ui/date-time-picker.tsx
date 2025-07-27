import * as React from "react"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateTimePickerProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Pick a date and time",
  disabled = false,
  className,
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )
  const [timeValue, setTimeValue] = React.useState<string>(
    value ? format(new Date(value), "HH:mm") : "09:00"
  )
  const [isOpen, setIsOpen] = React.useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      const [hours, minutes] = timeValue.split(":")
      const newDateTime = new Date(selectedDate)
      newDateTime.setHours(parseInt(hours), parseInt(minutes))
      onChange?.(newDateTime.toISOString().slice(0, 16))
    }
  }

  const handleTimeChange = (newTime: string) => {
    setTimeValue(newTime)
    if (date) {
      const [hours, minutes] = newTime.split(":")
      const newDateTime = new Date(date)
      newDateTime.setHours(parseInt(hours), parseInt(minutes))
      onChange?.(newDateTime.toISOString().slice(0, 16))
    }
  }

  const handleHourChange = (hour: string) => {
    const [, minutes] = timeValue.split(":")
    handleTimeChange(`${hour}:${minutes}`)
  }

  const handleMinuteChange = (minute: string) => {
    const [hours] = timeValue.split(":")
    handleTimeChange(`${hours}:${minute}`)
  }

  const displayValue = date ? format(date, "MMM dd, yyyy") + " at " + timeValue : ""

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
            
            <div className="border-t pt-4">
              <Label className="text-sm font-medium mb-3 block">Select Time</Label>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Select value={timeValue.split(":")[0]} onValueChange={handleHourChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">:</span>
                <Select value={timeValue.split(":")[1]} onValueChange={handleMinuteChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.filter((_, i) => i % 15 === 0).map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-3 grid grid-cols-4 gap-2">
                {["09:00", "12:00", "15:00", "18:00"].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTimeChange(time)}
                    className={cn(
                      "text-xs",
                      timeValue === time && "bg-primary text-primary-foreground"
                    )}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                disabled={!date}
              >
                Done
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}