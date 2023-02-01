import styled from "@emotion/styled";
import { colors, typography } from "../styles"

export const Button = styled.button`
    display:flex;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    padding:12px 16px;
    gap: 4px;

    border:none;
    border-radius: 4px;
    width: ${(props) => props.width || '100px'};
    height: ${(props) => props.height || '42px'};
    background: ${(props) => props.color || colors.orange};
    color: ${colors.white};
    ${typography.head.xxs};
    cursor:pointer
`;