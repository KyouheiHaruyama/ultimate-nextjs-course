import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {techMap} from "@/constants/techMap";
import { techDescriptionMap } from "@/constants/techDescriptionMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string) => {
    const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();

    return techMap[normalizedTechName] ? `${techMap[normalizedTechName]} colored` : "devicon-devicon-plain colored";
}

/**
 * 技術名を正規化し、その説明文を返します。
 * マップに存在しない場合は、汎用的なメッセージを返します。
 */
export const getTechDescription = (techName: string): string => {
    const normalizedTechName = techName.replace(/[ .]/g, "").toLowerCase();
    return techDescriptionMap[normalizedTechName] ?? "指定された技術に関する説明は利用できません。";
}

export const getTimestamp = (createdAt: Date) => {
    const date = new Date(createdAt);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? '' : 's'} ago`;
}