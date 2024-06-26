import React from 'react';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';

function Arrow({ children, disabled, onPress }: { children: React.ReactNode, disabled: boolean, onPress: VoidFunction }) {
    return (
        <button
            disabled={disabled}
            onPress={onPress}
            style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                right: '1%',
                opacity: disabled ? '0' : '1',
                userSelect: 'none',
            }}
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible));
    React.useEffect(() => {
        // NOTE: detect if whole component visible
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return (
        <Arrow disabled={disabled} onPress={() => scrollPrev()}>
            Left
        </Arrow>
    );
}

export function RightArrow() {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = React.useContext(VisibilityContext);

    // console.log({ isLastItemVisible });
    const [disabled, setDisabled] = React.useState(!visibleItemsWithoutSeparators.length && isLastItemVisible);
    React.useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return (
        <Arrow disabled={disabled} onPress={() => scrollNext()}>
            Right
        </Arrow>
    );
}
export function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY < 0) {
        apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
        apiObj.scrollPrev();
    }
}
