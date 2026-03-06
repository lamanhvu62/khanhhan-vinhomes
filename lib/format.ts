export function formatCurrencyVND(value: number | null | undefined): string {
    if (value === null || value === undefined) return 'Đang cập nhật';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDateVN(date: string | Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(new Date(date));
}
