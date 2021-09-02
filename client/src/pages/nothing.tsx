import * as React from "react";

export interface NothingProps {}

const Nothing: React.FunctionComponent<NothingProps> = () => {
        return (
                <div className="bg-yellow-300 ">
                        <h1 className="text-5xl font-semibold text-blue-500">Noting here, write you code</h1>
                </div>
        );
};

export default Nothing;
