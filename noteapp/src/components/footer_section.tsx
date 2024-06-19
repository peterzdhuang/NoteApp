
const FooterSection: React.FC = () => {
    return (
        <footer className="bg-secondary text-black py-6 dark:text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>&copy; 2024 NoteHub. All rights reserved.</p>
            <div className="space-x-4">
              <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    )
}

export default FooterSection;