'use client';
import React, { useState } from "react";

interface TimeRangeSelectProps {
    onTimeRangeChange: (value: string) => void;
}
  
const TimeRangeSelector: React.FC<TimeRangeSelectProps> = ({ onTimeRangeChange }) => {
    const [timeRange, setTimeRange] = useState<string>("medium_term");
  
    const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeRange(event.target.value);
        onTimeRangeChange(event.target.value);
    };
    
    return (
        <select defaultValue={timeRange} onChange={handleTimeRangeChange} className="border rounded p-2 mb-4">
            <option value="short_term">Last month</option>
            <option value="medium_term">Last 6 Months</option>
            <option value="long_term">All Time</option>
        </select>
    );
};

export default TimeRangeSelector;