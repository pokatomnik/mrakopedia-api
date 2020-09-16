// Common URLs
export function apiPage(title: string): string;
export function apiSearch(searchInput: string): string;
export function apiCategories(): string;
export function apiPagesByCategory(title: string): string;
export function apiStoriesOfMonth(): string;
export function apiRelated(title: string): string;
export function apiCategoriesByPage(title: string): string;
export function apiSourceUrl(title: string): string;
export function apiRandom(): string;

// User-related URLs
export function apiLogin(): string;
export function apiFavorite(title: string): string;
export function apiAllFavorites(): string;
export function apiIsFavorite(title: string): string;
export function apiInvite(): string;
export function apiMyInvites(): string;
export function apiRemoveInvite(inviteId: string): string;
export function checkInvite(inviteId: string): string;
export function register(): string;
