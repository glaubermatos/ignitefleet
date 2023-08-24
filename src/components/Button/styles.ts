import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity`
    flex: 1;
    min-height: 56px;
    max-height: 56px;

    background-color: ${({theme}) => theme.COLORS.BRAND_MID};

    border-radius: 6px;

    flex-direction: row;
    justify-content: center;
    align-items: center;

    opacity: ${({disabled}) => disabled ? 0.7 : 1} ;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        font-family: ${theme.FONT_FAMILY.BOLD};
        color: ${theme.COLORS.WHITE};
    `}
`;

export const Load = styled.ActivityIndicator.attrs(({theme}) => ({
    color: theme.COLORS.WHITE,
}))`
    margin-right: 16px;
`;