import Build from './build';

interface AllChangesResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: Build[],
}

export type {AllChangesResponse};
