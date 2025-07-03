// components/Toast.tsx
"use client";

import React, { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { Bus, CalendarDays, Clock, MapPin } from "lucide-react";

interface AccidentNotification {
    id: string;
    description: string;
    busNumber: string;
    scheduleNumber: string;
    operatedDepot: string;
    location: string;
    date: string;
    time: string;
}

export default function Toast({
    notification,
    onClose,
}: {
    notification: AccidentNotification;
    onClose: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-4 right-4 bg-white border border-red-300 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-fade-in-up">
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-800">Accident Alert</p>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 ml-4"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>

                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                                <Bus className="w-3 h-3 text-gray-500" />
                                <span>{notification.busNumber}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span>{notification.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CalendarDays className="w-3 h-3 text-gray-500" />
                                <span>{notification.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-500" />
                                <span>{notification.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}