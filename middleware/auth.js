export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!$auth.currentUser) {
    return redirect('/auth/login')
  }
}
