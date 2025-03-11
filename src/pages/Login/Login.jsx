import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

// preview-start
const providers = [
    { id: 'credentials', name: 'Email and Password' },
    { id: 'github', name: 'GitHub' },
    { id: 'google', name: 'Google' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'linkedin', name: 'LinkedIn' },
];

// preview-end

const signIn = async (provider, formData) => {
    // preview-start
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            alert(
                `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
            );
            console.log(`Sign in with ${provider.id}`);
            resolve({ error: 'This is a fake error' });
        }, 500);
    });
    // preview-end
    return promise;
};

export default function Login() {
    const theme = useTheme();
    return (
        // preview-start
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
            />
            <SignInPage signIn={signIn} providers={providers} />
        </AppProvider>
        // preview-end
    );
}
