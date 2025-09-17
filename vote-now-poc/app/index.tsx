import { Redirect } from 'expo-router';
import React from 'react';

export default function AppEntry() {
  // Simply redirect to login without using useEffect
  return <Redirect href="/login" />;
}
