"use client";
import { useState, useEffect } from 'react';
interface DatePickerProps {
    initialStart: string;
    initialEnd: string;
}
export default function DatePicker({ initialStart, initialEnd }: DatePickerProps) {
    const [startDate, setStartDate] = useState(initialStart);
    const [endDate, setEndDate] = useState(initialEnd);

    useEffect(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const formatted = yesterday.toISOString().split('T')[0];
        setStartDate(formatted);
        updateEndDate(formatted);
    }, []);

    const updateEndDate = (start: string) => {
        const startDt = new Date(start);
        startDt.setDate(startDt.getDate() + 1);
        const formattedEnd = startDt.toISOString().split('T')[0];
        setEndDate(formattedEnd);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate);
        updateEndDate(selectedDate);
    };

    return (
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6'>
            <div className='flex items-center gap-3'>
                <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>Start Date:</label>
                <div className='flex items-center border rounded-md p-2'>
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className='border-none p-0 text-sm focus:ring-0 w-[100px]'
                    />
                    <span className='text-sm text-gray-500 ml-0'>8:00 AM</span>
                </div>
            </div>

            <div className='flex items-center gap-3'>
                <label className='text-sm font-medium text-gray-700 whitespace-nowrap'>End Date:</label>
                <div className='flex items-center border rounded-md p-2 bg-gray-50'>
                    <input
                        type="date"
                        value={endDate}
                        disabled
                        className='border-none p-0 text-sm bg-transparent text-gray-500 w-[100px]'
                    />
                    <span className='text-sm text-gray-500 ml[-10px]'>7:59 AM</span>
                </div>
            </div>
        </div>
    );
}