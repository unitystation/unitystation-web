const fetchOfType = <T>(url: string, config?: RequestInit): Promise<T> =>
    fetch(url, config).then<T>((res) => res.json());

export default fetchOfType;
