function AssignmentCardTag({ tag }: { tag: string }) {
  return (
    <div className='bg-white/25 text-white my-1 mr-2 p-0.5 rounded md:text-lg font-mono underline border-slate-200
       border'>#{tag}</div>
  );
}

export default function AssignmentCard({ title, blurb, image, tags, livelink, repolink, children }: {
  title: string, blurb: string, image: string,
  tags?: string[], livelink?: string, repolink: string, children?: JSX.Element
}) {
  return (
    <article className='flex flex-col gap-y-2 border rounded border-white p-1 md:p-2 text-white w-full bg-white/5'>
      <header className='flex flex-col border-b'>
        <span className='text-2xl md:text-3xl font-bold'>{title}</span>
        {tags && <div className='flex flex-wrap my-2'>{tags.map(t => <AssignmentCardTag tag={t} />)}</div>}
      </header>
      <section className='flex flex-col gap-y-3 md:flex-row md:gap-x-2 md:gap-y-0 justify-between'>
        <div className='flex flex-col justify-around gap-y-1 md:gap-y-0 md:w-2/3'>
          <span className='text-lg md:text-xl'>{blurb}</span>
          {children}
        </div>
        <img src={image} className='flex md:w-1/2 grow rounded-md' />
      </section>
      <footer className='flex justify-between border-t py-2 mt-1'>
        {livelink ?
          <a className='hover:bg-white/10 text-white p-1 md:text-lg hover:underline border-orange-100 border'
            href={livelink}>Visit Live</a> : null}
        <a className='hover:bg-white/10 text-white p-1 md:text-lg hover:underline border-blue-100 border'
          href={repolink}>View Source</a>
      </footer>
    </article>
  );
}