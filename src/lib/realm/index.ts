//importação global do realm para evitar warnning do realm
import Realm from "realm";
Realm.flags.THROW_ON_GLOBAL_REALM = true;

import { createRealmContext } from '@realm/react'

import { Historic } from './schemas/Historic';

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior
}

export const {
    RealmProvider,
    useRealm,
    useQuery,
    useObject
} = createRealmContext({
    schema: [Historic]
})