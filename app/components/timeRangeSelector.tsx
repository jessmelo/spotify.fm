'use client';
import React, {useState } from "react";

interface TimeRangeSelectProps {
    timeSelection: string;
}
  
const TimeRangeSelector: React.FC<TimeRangeSelectProps> = ({ timeSelection }) => { 
    const [timeRange, setTimeRange] = useState<string>(timeSelection);
  
    const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeRange(event.target.value);
        console.log(timeRange);
    };
    
    return (
        <select defaultValue={timeRange} onChange={handleTimeRangeChange} className="border rounded p-2">
            <option value="short_term">Last month</option>
            <option value="medium_term">Last 6 Months</option>
            <option value="long_term">All Time</option>
        </select>
    );
};

export default TimeRangeSelector;