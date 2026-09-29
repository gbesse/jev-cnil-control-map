// Objectif : décrire les types de l’API métier publique.
import type{JevProvider}from"./jev.mjs";export const MAPPINGS:readonly string[];export function cnilDecision(input:any):any;export function privacyControl(input:any):any;export function mapControl(decision:any,control:any,provider:JevProvider):Promise<any>;
