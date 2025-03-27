// Define a type alias 'Result' that can be either an error or a success value
type Result<E, T> = [E] | [undefined, T];

// Define an async function that converts a promise into a Result type
export default async function toResultAsync<E extends Error, T>(
  promise: Promise<T>
): Promise<Result<E, T>> {
  try {
    // Await the promise
    const result = await promise;
    // If successful, return an array with undefined as the first element (no error)
    // and the result as the second element
    return [undefined, result as T];
  } catch (e) {
    // If an error occurs, return an array with the error as the first (and only) element
    return [e as E];
  }
}
