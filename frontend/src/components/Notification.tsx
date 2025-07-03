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
import toast from "react-hot-toast";

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
    const [wsStatus, setWsStatus] = useState<"connecting" | "connected" | "reconnecting" | "failed">("connecting");

    useEffect(() => {
        fetch("/api/notifications")
            .then((res) => res.json())
            .then((data) => {
                if (data.notifications) {
                    const parsed = parseNotifications(data.notifications);
                    setNotifications(parsed);
                    const newCount = parsed.filter((msg) => msg.isNew).length;
                    setUnreadCount(newCount);
                }
            });

        const timeout = setTimeout(() => {
            connectWebSocket();
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const connectWebSocket = () => {
        let attempts = 0;
        let socket: WebSocket;

        const connect = () => {
            setWsStatus(attempts > 0 ? "reconnecting" : "connecting");
            socket = new WebSocket("wss://jwuxenad2k.execute-api.ap-south-1.amazonaws.com/prod");

            socket.onopen = () => {
                console.log("✅ WebSocket connected");
                setWsStatus("connected");
                attempts = 0;
            };

            socket.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    const newNotification = parseNotifications([message])[0];

                    setNotifications((prev) => {
                        const updated = [newNotification, ...prev];
                        return updated.slice(0, 50);
                    });

                    setUnreadCount((prev) => prev + 1);

                    if (!muted) {
                        toast.custom(
                            <div className="bg-white rounded shadow px-4 py-3 border-l-4 border-red-500 w-72">
                                <p className="text-sm font-semibold text-gray-800">🚨 Accident Alert</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{newNotification.description}</p>
                            </div>
                        );
                    }
                } catch (e) {
                    console.error("Error parsing WebSocket message:", e);
                }
            };

            socket.onerror = (err) => {
                console.error("❌ WebSocket error:", err);
            };

            socket.onclose = (e) => {
                console.warn("⚠️ WebSocket closed. Retrying...", e.reason);
                setWsStatus("reconnecting");
                if (attempts < 5) {
                    attempts++;
                    setTimeout(connect, 2000 * attempts);
                } else {
                    setWsStatus("failed");
                }
            };
        };

        connect();
        return () => socket?.close();
    };

    useEffect(() => {
        if (wsStatus === "connected") return;

        const interval = setInterval(() => {
            fetch("/api/notifications")
                .then((res) => res.json())
                .then((data) => {
                    if (data.notifications) {
                        const parsed = parseNotifications(data.notifications);
                        setNotifications(parsed.slice(0, 50));
                        const newCount = parsed.filter((msg) => msg.isNew).length;
                        setUnreadCount(newCount);
                    }
                });
        }, 10000);

        return () => clearInterval(interval);
    }, [wsStatus]);

    const parseNotifications = (data: any[]): AccidentNotification[] => {
        return data.map((item, index) => ({
            id: item.accident_id ?? `${index + 1}`,
            description: item.description,
            busNumber: item.bonet_no,
            scheduleNumber: item.schedule_number,
            operatedDepot: item.operated_depot,
            conductorContact: item.conductor_phn_no,
            location: `${item.location_info?.address ?? ""}, ${item.location_info?.place ?? ""}`,
            date: item.date_of_accident,
            time: item.time_of_accident,
            isNew: item.isNew ?? true,
            timestamp: new Date(`${item.date_of_accident}T${item.time_of_accident}`),
        }));
    };

    const toggleNotifications = () => setShowNotifications((prev) => !prev);
    const toggleMute = () => setMuted((prev) => !prev);
    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isNew: false } : n))
        );
        setUnreadCount((count) => count - 1);
    };
    const removeNotification = (id: string) => {
        const isUnread = notifications.find((n) => n.id === id)?.isNew;
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        if (isUnread) setUnreadCount((count) => count - 1);
    };

    return (
        <div className="relative">
            <button onClick={toggleNotifications} className="relative p-2 rounded-full hover:bg-gray-100">
                {muted ? <BellOff className="w-5 h-5 text-gray-500" /> : <Bell className="w-5 h-5 text-gray-700" />}
                {unreadCount > 0 && !muted && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-0 -right-0 h-4 w-4 flex items-center justify-center p-0 text-[9px]"
                    >
                        {unreadCount}
                    </Badge>
                )}
            </button>

            {/* Sliding Notification Panel */}
            <div
                className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl transform ${showNotifications ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out z-50 border-l`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <button onClick={toggleNotifications} className="p-1 rounded-full hover:bg-gray-200">
                                <X className="w-5 h-5" />
                            </button>
                            <h3 className="text-lg font-semibold text-gray-700">Accident Alerts</h3>
                        </div>
                        <button onClick={toggleMute} className="p-1 rounded hover:bg-gray-200" title={muted ? "Unmute" : "Mute"}>
                            {muted ? <BellOff className="w-5 h-5 text-gray-500" /> : <Bell className="w-5 h-5 text-gray-700" />}
                        </button>
                    </div>

                    <div className="px-4 py-2 text-xs text-gray-500 italic">
                        {wsStatus === "connecting" && "Connecting to WebSocket..."}
                        {wsStatus === "reconnecting" && "Reconnecting..."}
                        {wsStatus === "failed" && "WebSocket failed. Polling fallback active."}
                    </div>

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
                                    const isHighlighted = index === 0;
                                    return (
                                        <div
                                            key={notification.id}
                                            className={`relative p-5 rounded-lg transition-all space-y-3 border shadow-md ${isHighlighted
                                                ? "border-2 border-red-500 bg-red-50"
                                                : "border-gray-200 bg-white"
                                                }`}
                                        >
                                            <button
                                                onClick={() => removeNotification(notification.id)}
                                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                            <div className="flex items-start gap-2">
                                                <AlertTriangle className="text-red-600 w-5 h-5 mt-0.5" />
                                                <p className="text-sm font-medium text-gray-800 break-words">
                                                    {notification.description}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div className="flex items-start gap-2">
                                                    <Bus className="w-4 h-4 mt-1 text-gray-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Bonnet No.</p>
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
                                                        <p className="font-semibold">{notification.operatedDepot}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Phone className="w-4 h-4 mt-1 text-gray-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Contact</p>
                                                        <a
                                                            href={`tel:${notification.conductorContact}`}
                                                            className="text-blue-600 font-semibold hover:underline"
                                                        >
                                                            {notification.conductorContact}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 border-t pt-3 text-sm text-gray-600 gap-2">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                    <span>{notification.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{notification.time}</span>
                                                    <span>•</span>
                                                    <span>{notification.date}</span>
                                                </div>
                                            </div>

                                            {notification.isNew && (
                                                <div className="flex justify-between items-center">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-200 text-red-800">
                                                        New
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-3 border-t text-center bg-white">
                            <p className="text-xs text-gray-500">
                                Showing {notifications.length} accident alerts
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showNotifications && (
                <div className="fixed inset-0 bg-black/20 z-40" onClick={toggleNotifications} />
            )}
        </div>
    );
};

export default NotificationSystem;
