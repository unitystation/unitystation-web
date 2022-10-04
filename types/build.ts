import Change from './change';

interface Build {
    version_number: string,
    date_created: string,
    changes: Change[],
}

export default Build;
