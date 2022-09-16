import LayoutChildren from '../../types/layoutChildren';


const Card = (props: LayoutChildren) => {
    const { children } = props;
    return (
        <div className={"flex justify-center"}>
            <div className={"block p-6 rounded-lg shadow-lg bg-gray-800 max-w-sm"}>
                {children}
            </div>
        </div>
)
}

const CardTitle = (props: LayoutChildren) => {
    const { children } = props;
    return (
        <h5 className={"text-white text-xl leading-tight font-medium mb-2"}>
            {children}
        </h5>
    )
}

const CardBody = (props: LayoutChildren) => {
    const { children } = props;
    return (
        <div className={"text-base p-2"}>
            {children}
        </div>
    )
}

export { Card, CardTitle, CardBody };
