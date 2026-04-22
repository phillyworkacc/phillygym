'use client'
import { useModal } from '@/components/Modal/ModalContext'
import { FullPost } from '@/types/types'
import AppWrapper from '@/components/AppWrapper/AppWrapper'
import CreatePost from '@/components/CreatePost/CreatePost'
import CreatePostModalForm from '@/components/ModalForms/ModalForms'
import PostsViewer from '@/components/PostsViewer/PostsViewer'

type CommunityPageProps = {
	allPosts: FullPost[];
	nextCursor: any;
}

export default function CommunityPage ({ allPosts, nextCursor }: CommunityPageProps) {
	const { showModal } = useModal();

	function handleCreatePost () {
		showModal({ content: (<CreatePostModalForm />) });
	}

	return (
		<AppWrapper>
			<PostsViewer 
				allPosts={allPosts}
				nextCursor={nextCursor}
			/>
			<CreatePost onClick={handleCreatePost} />
		</AppWrapper>
	)
}
