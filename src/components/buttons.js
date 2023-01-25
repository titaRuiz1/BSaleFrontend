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
    width: 100px;
    height: 42px;
    background: ${colors.orange};
    color: ${colors.white};
    ${typography.head.xxs};
    cursor:pointer
`;