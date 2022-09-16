interface Change {
    author_username: string,
    author_url: string,
    description: string,
    pr_url: string,
    pr_number: number,
    category: "FIX" | "NEW" | "IMPROVEMENT" | "BALANCE",
    build: string,
    date_added: string,
}

interface WhatsNewResponse {
    build: string,
    changes: Change[],
}

export type {WhatsNewResponse, Change};
