import styled from "styled-components/native";
import theme from "../../theme";
import { ActivityIndicator } from "react-native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: ${theme.COLORS.GRAY_800};
`;

export const LoadingIndicator = styled.ActivityIndicator
    .attrs(() => ({
        color: theme.COLORS.BRAND_LIGHT,
    }))``;