export interface PageParams {
    params: Promise<{slug: string}>,
    searchParams: Promise<any>
}