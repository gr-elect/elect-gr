'use client';

import { Demographics, VoteChoice, PartyChoice } from './schema';

// Cookie names
const DEMOGRAPHICS_COOKIE = 'poll_demographics';
const PM_VOTE_COOKIE = 'pm_vote';
const PARTY_VOTE_COOKIE = 'party_vote';

// Cookie helpers
export function setCookie(name: string, value: string, days = 30) {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Demographics functions
export function saveDemographics(demographics: Demographics) {
  setCookie(DEMOGRAPHICS_COOKIE, JSON.stringify(demographics));
}

export function loadDemographics(): Demographics | null {
  const data = getCookie(DEMOGRAPHICS_COOKIE);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as Demographics;
  } catch {
    return null;
  }
}

// Prime Minister vote functions
export function savePMVote(choice: VoteChoice) {
  setCookie(PM_VOTE_COOKIE, choice);
}

export function loadPMVote(): VoteChoice | null {
  return getCookie(PM_VOTE_COOKIE) as VoteChoice | null;
}

// Party vote functions
export function savePartyVote(choice: PartyChoice) {
  setCookie(PARTY_VOTE_COOKIE, choice);
}

export function loadPartyVote(): PartyChoice | null {
  return getCookie(PARTY_VOTE_COOKIE) as PartyChoice | null;
}

// Clear all votes (but keep demographics)
export function clearVotes() {
  deleteCookie(PM_VOTE_COOKIE);
  deleteCookie(PARTY_VOTE_COOKIE);
}

// Clear everything
export function clearAllData() {
  deleteCookie(DEMOGRAPHICS_COOKIE);
  deleteCookie(PM_VOTE_COOKIE);
  deleteCookie(PARTY_VOTE_COOKIE);
}
