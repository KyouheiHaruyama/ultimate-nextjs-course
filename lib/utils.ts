import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {techMap} from "@/constants/techMap";
import { techDescriptionMap } from "@/constants/techDescriptionMap";
import {BADGE_CRITERIA} from "@/constants";

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

export const formatNumber = (number: number) => {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    } else {
        return number.toString();
    }
}

export const assignBadges = (params: {
    criteria: {
        type: keyof typeof BADGE_CRITERIA;
        count: number;
    }[];
}) =>
{
    const badgeCounts: Badges = {
        GOLD: 0,
        SILVER: 0,
        BRONZE: 0
    };

    const { criteria } = params;

    criteria.forEach(({ type, count }) => {
        const badgeLevels = BADGE_CRITERIA[type];

        Object.keys(badgeLevels).forEach(level => {
            if (count >= badgeLevels[level as keyof typeof badgeLevels]) {
                badgeCounts[level as keyof Badges] += 1;
            }
        });
    });

    return badgeCounts;
}

export function processJobTitle(title: string | undefined | null): string {
    // Check if title is undefined or null
    if (title === undefined || title === null) {
        return "No Job Title";
    }

    // Split the title into words
    const words = title.split(" ");

    // Filter out undefined or null and other unwanted words
    const validWords = words.filter((word) => {
        return (
            word !== undefined &&
            word !== null &&
            word.toLowerCase() !== "undefined" &&
            word.toLowerCase() !== "null"
        );
    });

    // If no valid words are left, return the general title
    if (validWords.length === 0) {
        return "No Job Title";
    }

    // Join the valid words to create the processed title
    const processedTitle = validWords.join(" ");

    return processedTitle;
}