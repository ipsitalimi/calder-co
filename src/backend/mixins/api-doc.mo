mixin () {
  public query func getApiDoc() : async Text {
    "# CALDER & CO. Backend API

## Purpose

This canister is the backend for the CALDER & CO. architecture studio portfolio. It is a minimal actor: it holds no domain entities and persists no queryable application data. Its public surface exists to support caller identity and role management for the app, plus a read-only data-intelligence query endpoint.

## Public methods

### `getCallerUserRole() : async UserRole` (query)

Returns the role assigned to the calling principal.

- `UserRole` is a variant: `#admin`, `#user`, or `#guest`.
- An unregistered caller (one that has never been initialized) is reported as `#guest`.
- This is a read-only query; it does not mutate state.

### `isCallerAdmin() : async Bool` (query)

Returns `true` when the calling principal holds the `#admin` role, `false` otherwise. Read-only.

### `assignCallerUserRole(user : Principal, role : UserRole) : async ()` (update)

Assigns `role` to the principal `user`.

- Only an existing admin may call this. A non-admin caller is rejected with a trap.
- This is the only way to grant the `#admin` role to another principal after initialization.
- The call is an update and persists the change.

### `_initialize_access_control() : async ()` (update)

Registers the calling principal with the authorization system.

- The **first** caller to invoke it becomes `#admin`; every subsequent caller becomes `#user`.
- It is idempotent in effect for an already-registered caller: the existing role is preserved.
- A caller must be registered before any role-guarded call succeeds. Registration normally happens automatically when a user signs in through the app's own frontend.

### `schema() : async Text` (query)

Returns the OQL schema description for this canister. Because the actor exposes no entities, the schema declares an empty entity list.

### `execute(query : Text) : async Text` (update)

Runs a JSON-encoded OQL query against the canister's exposed entities and returns the result as JSON text. With no entities exposed, any query returns an empty result set rather than data.

### `getApiDoc() : async Text` (query)

Returns this document as static Markdown. It reads no state and never changes.

## Authentication and authorization

- **Anonymous callers** are treated as `#guest`. They may call the read-only queries (`getCallerUserRole`, `isCallerAdmin`, `schema`, `getApiDoc`), but they cannot pass any admin-guarded update.
- **Signed-in callers** are identified by their principal. Signing in through the app's frontend registers the principal with the authorization system.
- **Owner / first initializer**: the first principal to call `_initialize_access_control` receives `#admin`.
- **Admin**: an admin may call `assignCallerUserRole` to grant roles to other principals.
- **Unregistered callers**: a principal that has never been registered is `#guest`. Admin-guarded updates trap for such callers.

### Identity derivation

The app's frontend pins an Internet Identity derivation origin, published at `/.well-known/ii-derivation-origin` when available. An agent that already holds the user's Internet Identity authorization derives the correct per-app principal against that origin, for example:

```
icp identity link web <name> --app <host>
```

Such a delegation acts with the user's full authority in this app until it expires. Note that a principal derived against a different origin is a **different principal** than the one the frontend registered, so it will appear unregistered even if it belongs to the same human user.

### Registration prerequisite for direct API callers

A caller that never signed in through the app's frontend is unregistered. To use role-guarded endpoints directly, call `_initialize_access_control` once as a signed-in caller before any other role-guarded call, including guarded queries. The first initializer receives `#admin`; every later caller receives `#user`. An unregistered caller on a guarded endpoint is rejected with a trap.

## Units and encodings

- **Principals** are Candid `principal` values; text forms are the standard IC principal text encoding.
- **Roles** are the variant `UserRole` (`#admin`, `#user`, `#guest`).
- **`schema()` and `execute()`** exchange JSON encoded as `Text`.
- **`getApiDoc()`** returns Markdown encoded as `Text`.
- There are no timestamps, numeric identifiers, or blobs in the public API.

## Lifecycle and polling

- `_initialize_access_control` is a one-time registration step per principal. There is no asynchronous job, no progress state, and therefore nothing to poll.
- All other methods complete synchronously within a single call.
- `getApiDoc` and `schema` are pure reads and are safe to call at any time.

## Mutation retry safety

- `_initialize_access_control` is safe to retry: a caller that is already registered keeps its existing role.
- `assignCallerUserRole` is idempotent for a given `(user, role)` pair — repeating the call leaves the same assignment.
- No method has destructive side effects, and no method deletes data.

## Errors, traps, and gotchas

- Calling `assignCallerUserRole` as a non-admin traps; the message is not a structured error variant, so callers should check `isCallerAdmin` first.
- Calling any admin-guarded endpoint while unregistered traps.
- `execute` returns an empty result set because no entities are exposed; it is not an error.
- `getApiDoc` returns a static document and does not reflect runtime state.
";
  };
};
