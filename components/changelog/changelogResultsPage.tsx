import {AllChangesResponse} from '../../types/allChangesResponse';
import BuildComponent from './buildComponent';
import SimplePagination from '../pagination/simplePagination';

interface ChangelogResultsPageProps extends AllChangesResponse {
    handlePrevClicked: () => void;
    handleNextClicked: () => void;
}

const ChangelogResultsPage = (props: ChangelogResultsPageProps) => {
    const {next = null, previous = null, results, handleNextClicked, handlePrevClicked} = props;

    return (<>
            {results.map((result, index) => {
                return (<div key={index}>
                        <BuildComponent
                            key={result.version_number}
                            version_number={result.version_number}
                            date_created={result.date_created}
                            changes={result.changes}
                        />
                    </div>)
            })}
        <SimplePagination
            enablePrev={previous != null}
            enableNext={next != null}
            onPrevClicked={handlePrevClicked}
            onNextClicked={handleNextClicked} />
        </>)
}



export default ChangelogResultsPage;
