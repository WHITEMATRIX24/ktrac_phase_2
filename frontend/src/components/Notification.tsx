"use client";

import React, { useState, useEffect } from "react";
import {
    Bell,
    BellOff,
    X,
    Phone,
    MapPin,
    Bus,
    Clock,
    CalendarDays,
    AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AccidentNotification {
    id: string;
    description: string;
    busNumber: string;
    scheduleNumber: string;
    operatedDepot: string;
    conductorContact: string;
    location: string;
    date: string;
    time: string;
    isNew: boolean;
    timestamp: Date;
}

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState<AccidentNotification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [muted, setMuted] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const dummyNotifications: AccidentNotification[] = [
            {
                id: "1",
                description: "Bus collided with a private vehicle at traffic signal",
                busNumber: "KL-07-AB-1234",
                scheduleNumber: "SCH-2456",
                operatedDepot: "EKM",
                conductorContact: "+91 9876543210",
                location: "MG Road Junction, Kochi",
                date: "2023-06-15",
                time: "14:30",
                isNew: false,
                timestamp: new Date("2023-06-15T14:30:00"),
            },
            {
                id: "2",
                description: "Mirror damage from passing truck",
                busNumber: "KL-07-AB-5678",
                scheduleNumber: "SCH-1892",
                operatedDepot: "ALP",
                conductorContact: "+91 8765432109",
                location: "NH-66, Alappuzha",
                date: "2023-06-16",
                time: "09:00",
                isNew: true,
                timestamp: new Date("2023-06-16T09:00:00"),
            },
            {
                id: "3",
                description: "Bus skidded on wet road, no injuries reported",
                busNumber: "KL-07-CD-9012",
                scheduleNumber: "SCH-3124",
                operatedDepot: "EKM",
                conductorContact: "+91 7654321098",
                location: "Vytilla Junction, Kochi",
                date: "2023-06-17",
                time: "18:15",
                isNew: true,
                timestamp: new Date("2023-06-17T18:15:00"),
            },
        ];

        setNotifications(dummyNotifications);
        setUnreadCount(dummyNotifications.filter((n) => n.isNew).length);
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const toggleMute = () => setMuted(!muted);

    const clearAll = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    const markAsRead = (id: string) => {
        setNotifications((notifs) =>
            notifs.map((n) => (n.id === id ? { ...n, isNew: false } : n))
        );
        setUnreadCount((count) => count - 1);
    };

    const removeNotification = (id: string) => {
        const isUnread = notifications.find((n) => n.id === id)?.isNew;
        setNotifications((notifs) => notifs.filter((n) => n.id !== id));
        if (isUnread) setUnreadCount((count) => count - 1);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleNotifications}
                className="relative p-2 rounded-full hover:bg-gray-100"
            >
                {muted ? (
                    <BellOff className="w-5 h-5 text-gray-500" />
                ) : (
                    <Bell className="w-5 h-5 text-gray-700" />
                )}
                {unreadCount > 0 && !muted && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                        {unreadCount}
                    </Badge>
                )}
            </button>

            {/* Panel */}
            <div
                className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform ${showNotifications ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50 border-l`}
            >
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={toggleNotifications}
                                className="p-1 rounded-full hover:bg-gray-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-lg font-semibold text-gray-700">
                                Accident Alerts
                            </h3>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={toggleMute}
                                className="p-1 rounded hover:bg-gray-200"
                                title={muted ? "Unmute notifications" : "Mute notifications"}
                            >
                                {muted ? (
                                    <BellOff className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <Bell className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearAll}
                                    className="text-sm text-gray-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-100"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notification List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
                                <Bell className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                                <p>No accident alerts</p>
                                <p className="text-sm mt-1">All clear at the moment</p>
                            </div>
                        ) : (
                            notifications
                                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                                .map((notification, index) => {
                                    const isHighlighted = index < 2;
                                    return (
                                        <div
                                            key={notification.id}
                                            className={`relative p-5 rounded-lg transition-all space-y-3 
                                                border shadow-md
                                                ${isHighlighted
                                                    ? "border-2 border-red-500 bg-red-50"
                                                    : "border-gray-200 bg-white"
                                                }
                                            `}
                                        >
                                            {/* Delete */}
                                            <button
                                                onClick={() => removeNotification(notification.id)}
                                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                            {/* Description */}
                                            <div className="flex items-start gap-2">
                                                <AlertTriangle className="text-red-600 w-5 h-5 mt-0.5" />
                                                <p className="text-sm font-medium text-gray-800 break-words">
                                                    {notification.description}
                                                </p>
                                            </div>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div className="flex items-start gap-2">
                                                    <Bus className="w-4 h-4 mt-1 text-gray-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Bus No.</p>
                                                        <p className="font-semibold">{notification.busNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <CalendarDays className="w-4 h-4 mt-1 text-gray-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Schedule</p>
                                                        <p className="font-semibold">{notification.scheduleNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 mt-1 text-gray-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Depot</p>
                                                        <p className="font-semibold break-words">{notification.operatedDepot}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Phone className="w-4 h-4 mt-1 text-gray-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Contact</p>
                                                        <a href={`tel:${notification.conductorContact}`} className="text-blue-600 font-semibold hover:underline break-words">
                                                            {notification.conductorContact}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer Info */}
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 border-t pt-3 text-sm text-gray-600 gap-2">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <span className="break-words max-w-full">
                                                        {notification.location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{notification.time}</span>
                                                    <span>•</span>
                                                    <span>{notification.date}</span>
                                                </div>
                                            </div>

                                            {/* Optional Badge */}
                                            {notification.isNew && (
                                                <div className="flex justify-between items-center">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-200 text-red-800">
                                                        New
                                                    </span>
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        Mark as read
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t text-center bg-white">
                            <p className="text-xs text-gray-500">
                                Showing {notifications.length} accident alerts
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {showNotifications && (
                <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={toggleNotifications}
                />
            )}
        </div>
    );
};

export default NotificationSystem;
