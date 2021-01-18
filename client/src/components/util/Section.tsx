import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Button, { ButtonSkin } from './Button'

import 'styles/util/section';

interface SectionProps {
    header: string | ReactNode,
    showCloseButton: boolean

    onCloseButtonClick?: () => void,

    children?: ReactNode,
}

export default function Section(props: SectionProps) {
    return <div className="section">
        <div className="header">
            {props.header}

            { props.showCloseButton &&
                <Button skin={ButtonSkin.close} onClick={props.onCloseButtonClick}/>
            }
        </div>
        <div className="body">
            {props.children}
        </div>
    </div>
}

Section.defaultProps = {
    showCloseButton: false
}