export default function ({ store, redirect }) {
  // If user is authenticated
  if ($auth.currentUser) {
    return redirect('/')
  }
}
