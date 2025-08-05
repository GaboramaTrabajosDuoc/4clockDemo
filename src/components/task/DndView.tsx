import React from 'react';
import { View, ViewProps } from 'react-native';

interface DndViewProps extends ViewProps {
    children: React.ReactNode;
    style?: ViewProps['style'];
}

//Props for the DndView component
const DND_PROPS_TO_FILTER = [
    'tabIndex',
    'role',
    'aria-disabled',
    'aria-pressed',
    'aria-roledescription',
    'aria-describedby',
];

const DndView = ({children, ...props}: DndViewProps) => {
    //filter out unwanted props
    const filterProps = (props: ViewProps) =>
        Object.keys(props).reduce((acc: Record<string, any>, key) => {
            if (!DND_PROPS_TO_FILTER.includes(key)) {
                acc[key] = (props as any)[key];
            }
            return acc;
        }, {} as Record<string, any>);

//return the View component with filtered props
    return (
        <View {...filterProps(props)}>{children}</View>
    );
}