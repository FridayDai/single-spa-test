import { registerMicroApps, start } from 'qiankun';
import React from 'react';
import { render } from 'react-dom';

const Component = () => {
    return (
        <div>
            <div>header</div>
            <div>
                <div>slider</div>
                <div id='iframe'>

                </div>
            </div>
        </div>
    );
};

const dom = document.querySelector('#app');
render(<Component/>, dom);

registerMicroApps([
    {
        name: 'react app', // app name registered
        entry: '106.15.93.13:3004/single-page-two',
        container: '#iframe',
        activeRule: '/a',
    },
    // {
    //     name: 'vue app',
    //     entry: { scripts: ['//localhost:7100/main.js'] },
    //     container: '#yourContainer2',
    //     activeRule: '/yourActiveRule2',
    // },
]);
start();