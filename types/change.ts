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

export default Change;
